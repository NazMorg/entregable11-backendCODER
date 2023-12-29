import { usersService } from '../services/users.service.js';
import { errorMessages } from '../middlewares/error.enum.js';

class UsersController {
    userSignup = async (req, res) => {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ error: errorMessages.ALL_DATA_IS_REQUIRED });
        }
        const createdUser = await usersService.createOne(req.body);
        if (!createdUser) {
            res.redirect("/signup");
        }
        res.status(200).redirect("/");
    }

    userLogout = (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
}

export const usersController = new UsersController();