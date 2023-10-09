import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '310302165538-nieku7jn8daofbvjulu1pq3v194e20hr.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: '/auth/login/google/redirect',
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log({ profile, cb });
            return cb(null, profile);
        },
    ),
);
