require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const path = require('path');
const app = express();

// استخدام المنفذ من ملف .env أو 3000 كافتراضي
const port = process.env.PORT || 3000;
const api = process.env.HOST || 'localhost';

// إعدادات Middleware الأساسية
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // ضروري لحل مشكلة JSON في صفحة المهام
app.use(express.urlencoded({ extended: true })); 
app.use(cookies());

// 1. مسارات العمليات (API Routes) - يجب أن تكون في البداية
app.use('/auth', require('./routes/auth_R'));
app.use('/tasks', require('./routes/tasks_R'));

// 2. مسارات الصفحات (Page Routes)
app.use('/', require('./routes/pages_R'));

// هذا يغطي المسار الرئيسي فقط، وهو الأكثر أماناً لإصدارات Express الجديدة
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://${api}:${port}`);
});