require('dotenv').config(); // 1. تحميل الإعدادات أولاً

const express = require('express');
const path = require('path');
const db = require('./config/db_config'); // 2. استدعاء قاعدة البيانات

const app = express();
const port = process.env.DB_PORT || 3000; // استخدم قيمة افتراضية في حال فشل الـ env

// ... (باقي الـ middleware والـ routes)

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});