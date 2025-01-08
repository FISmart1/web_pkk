// Import paket yang diperlukan
const express = require('express'); // Framework web untuk membuat server
const mongoose = require('mongoose'); // Library untuk koneksi ke MongoDB
const bodyParser = require('body-parser'); // Middleware untuk membaca data JSON dari request
const cors = require('cors'); // Middleware untuk mengizinkan komunikasi antar domain
require('dotenv').config(); // Mengambil variabel lingkungan dari file .env

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(bodyParser.json()); // Mem-parsing body request menjadi JSON

// Port
const PORT = process.env.PORT || 5000; // Port server, default 5000

// Endpoint dasar untuk mengecek server
const path = require('path'); // Untuk mengelola path file

app.use(express.static(path.join(__dirname, 'Sources')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sources' , 'index.html'));
});


// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log untuk memastikan server berjalan
});

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Menggunakan parser URL baru untuk koneksi yang lebih stabil
    useUnifiedTopology: true, // Mengaktifkan engine koneksi terbaru
  }).then(() => {
    console.log('Connected to MongoDB'); // Log saat koneksi berhasil
  }).catch((err) => {
    console.error('Database connection error:', err); // Log jika terjadi kesalahan
  });

  const taskRoutes = require('./routes/taskRoutes/'); // Mengimpor rute tugas
  app.use('/api', taskRoutes); // Menambahkan prefiks /api untuk semua rute