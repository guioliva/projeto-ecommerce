import mongoose from "mongoose";

// aqui padronizamos a estrutura dos dados que vamos mandar para o banco de dados

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
  },
    { timestamps: true }
);

export default mongoose.model("user", userSchema);