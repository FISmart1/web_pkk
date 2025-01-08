const express = require('express'); // Mengimpor Express
const Task = require('../models/Task'); // Mengimpor model Task

const router = express.Router(); // Membuat router baru

// Endpoint untuk mendapatkan semua tugas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Mengambil semua data dari database
    res.status(200).json(tasks); // Mengembalikan data dengan status 200
  } catch (err) {
    res.status(500).json({ error: err.message }); // Menangani kesalahan
  }
});

// Endpoint untuk menambahkan tugas baru
router.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body); // Membuat instance baru berdasarkan data dari klien
    const savedTask = await newTask.save(); // Menyimpan data ke database
    res.status(201).json(savedTask); // Mengembalikan data yang telah disimpan
  } catch (err) {
    res.status(400).json({ error: err.message }); // Menangani kesalahan
  }
});

// Endpoint untuk memperbarui tugas
router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // ID tugas yang akan diperbarui
      req.body, // Data baru dari klien
      { new: true, runValidators: true } // Mengembalikan data yang telah diperbarui dan menjalankan validasi
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' }); // Jika ID tidak ditemukan
    }
    res.status(200).json(updatedTask); // Mengembalikan data yang telah diperbarui
  } catch (err) {
    res.status(400).json({ error: err.message }); // Mengirim error jika gagal
  }
});

// Endpoint untuk menghapus tugas
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Menghapus data berdasarkan ID
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' }); // Jika ID tidak ditemukan
    }
    res.status(200).json({ message: 'Task deleted successfully' }); // Mengembalikan pesan sukses
  } catch (err) {
    res.status(500).json({ error: err.message }); // Mengirim error jika gagal
  }
});

module.exports = router; // Mengekspor router