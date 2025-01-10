const express = require('express'); // Mengimpor Express
const Task = require('../models/Task'); // Mengimpor model Task
const mongoose = require('mongoose');


const router = express.Router(); // Membuat router baru

// Endpoint untuk mendapatkan semua tugas
router.get('/tasks/:id?', async (req, res) => {
  try {
    const { id } = req.params;

    // Jika ID diberikan, cari berdasarkan ID
    if (id) {
      // Validasi ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Task ID' });
      }

      // Cari task berdasarkan ID
      const task = await Task.findById(id);

      // Jika task tidak ditemukan
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Jika ditemukan, kirimkan task
      return res.status(200).json(task);
    }

    // Jika ID tidak diberikan, ambil semua data
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Menangani kesalahan lainnya
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