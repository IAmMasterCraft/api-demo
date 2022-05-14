const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();

const USER_LIST = [];

router.post("/register", (request, response) => {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
        return response.status(200).json({
            success: false,
            message: 'Please fill all missing fields',
        });
    }

    if (USER_LIST.find((user) => user.email === email)) {
        return response.status(200).json({
            success: false,
            message: 'Email already exist',
        });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userObject = {
        name,
        email,
        password: passwordHash,
    };

    USER_LIST.push(userObject);
    return response.status(200).json({
        success: true,
        message: 'User Created Successfully!',
    });
})

router.post("/login", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(200).json({
            success: false,
            message: 'Please enter email and password',
        });
    }

    const user = USER_LIST.find(user => user.email === email);

    if (!user) {
        return response.status(200).json({
            success: false,
            message: 'User not found',
        });
    }

    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            return response.status(200).json({
                success: false,
                message: 'Something went wrong with user authentication',
            });
        }
        if (result) {
            return response.status(200).json({
                success: true,
                message: 'Login successful!',
                profile: user,
            });
        } else {
            return response.status(200).json({
                success: false,
                message: 'Password is not correct!',
            });
        }
    })

})

router.get("/all-user", (request, response) => {
    // hide user's password from response
    const all_users = USER_LIST.map(user => ({name: user.name, email: user.email, password: "Not Available"}))
    return response.status(200).json({
        success: true,
        message: "User records fetched successfully!",
        users: all_users,
    });
})

module.exports = router;