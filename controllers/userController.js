import User from "../models/userModel.js";

export const getUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const createUser = async (req, res) => {
    try{
        console.log("sss")
        const {firstname, lastname, age, city, mobile} = req.body;

        // if(!(firstname && lastname && age && city && mobile)) {
        //     res.status(400).send("All inputs are required.");
        // }

        const user = new User({
            firstname: firstname,
            lastname: lastname,
            age: age,
            city: city,
            mobile: mobile
        })

        const newUser = await user.save();
        res.status(201).json(newUser);

    } catch(error) {
        console.log(error);
        res.status(400).send(error)
    }
}

export const updateUser = async (req, res) => {
    try{
        const {firstname, lastname, age, city, mobile} = req.body;
        const { id } = req.params;
        const user = await User.findById(id);

        if(firstname) {
            user.firstname = firstname;
        }
        if(lastname) {
            user.lastname = lastname
        }
        if(age) {
            user.age = age
        }
        if(city) {
            user.city = city
        }
        if(mobile) {
            user.mobile = mobile
        }

        const updatedUser = await user.save();
        res.status(202).json(updatedUser);

    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        const deletedUser = await user.remove();
        res.send(`user deleted successfully ${deletedUser}`)
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}