const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/routes');
const supplierRoutes = require('./routes/supplierRoute');
const medicineRoutes = require('./routes/medicineRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const prescriptionItemRoutes = require('./routes/prescriptionItemRoutes');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/auth', authRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/prescription-items', prescriptionItemRoutes);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});