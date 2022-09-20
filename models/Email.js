const mongoose = require("mongoose");
const EmailSchema = new mongoose.Schema(
    {
      subject: { type: String, required: true},
     from :{ type: String, required: true},
     to:{ type: String, required: true},
     content:{ type: String, required: true},
     date :{ type: String, required: true},
     time:{ type: String, required: true},
      
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Email", EmailSchema);