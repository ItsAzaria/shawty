import passportLocal from "passport-local";
import bcrypt from "bcrypt";

// passport.Strategy;
// LocalStrategy.Strategy;

export default function initialize(passport: any, getUserByEmail: any, getUserById: any) {
    const authenticateUser = async (email: any, password: any, done: any) => {
        const user = await getUserByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Invalid credentials'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid credentials'});
            }
        } catch(e) {
            return done(e);
        }
    }

    passport.use(new passportLocal.Strategy({ usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user: any, done: any) => done(null, user.id));

    passport.deserializeUser((id: any, done: any) => {
        return done(null, getUserById(id));
    });
}

// module.exports = initialize;