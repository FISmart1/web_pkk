const mongoose = require('mongoose'); // Mengimpor Mongoose

// Membuat skema tugas
const TaskSchema = new mongoose.Schema({
  title: {
    type: String, // Jenis data untuk judul tugas
    required: [true, 'Title is required'], // Wajib diisi
    trim: true, // Menghapus spasi di awal/akhir string
  },
  description: {
    type: String, // Jenis data untuk deskripsi tugas
    trim: true, // Menghapus spasi di awal/akhir string
  },
  completed: {
    type: Boolean, // Status apakah tugas sudah selesai
    default: false, // Nilai default adalah `false`
  },
  createdAt: {
    type: Date, // Tanggal pembuatan tugas
    default: Date.now, // Secara default diisi dengan waktu saat ini
  },
});

// Membuat model berdasarkan skema
const Task = mongoose.model('Task', TaskSchema);

// Mengekspor model untuk digunakan di file lain
module.exports = Task;