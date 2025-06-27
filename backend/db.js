const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Kyube:Btruong97@productmanger.er0qmqv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB error:', err));
