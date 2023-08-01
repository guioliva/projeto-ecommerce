import bcrypt from "bcrypt";
import UserSchema from "../models/userSchema.js";

//MONTAR O NOSSO CRUD

// listar todos os usuários da database
const getAll = async (req, res) => {
  // db.people.find({"gender": "Female"})
  try {
    const users = await UserSchema.find();

    if (!users) {
      res.status(500).send({
        statusCode: 500,
        message: err.message,
      });
    }

    res.status(200).send({
      statusCode: 200,
      data: {
        users,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
// criar um novo usuário na database

const createUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      data: {
        savedUser,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      statusCode: 500,
      message: "User not saved",
    });
  }
};

// atualizar um usuário
const updateUserById = async (req, res) => {
  try {
    //findByIdAndUpdate(filtro, info a ser atualizada)
    await UserSchema.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      statusCode: 200,
      message: "User updated",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      statusCode: 500,
      message: "User not updated",
    });
  }
};

const findUserById = async (req, res) => {
  try {
    //findByIdAndUpdate(filtro, info a ser atualizada)
    await UserSchema.findById(req.params.id, (erro, user) => {
      if (user != null){
        res.status(200).send({
          statusCode: 200,
          user});
      } else{
        res.status(500).send({
          statusCode: 500,
          message: "User not found",
        });
      }
      });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      statusCode: 500,
      message: "Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    //findByIdAndUpdate(filtro, info a ser atualizada)
    await UserSchema.findByIdAndDelete(req.params.id);

    res.status(200).send({
      statusCode: 200,
      message: "User deleted",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      statusCode: 500,
      message: "User not deleted",
    });
  }
};



export default {
  getAll,
  createUser,
  updateUserById,
  deleteUserById,
  findUserById
};