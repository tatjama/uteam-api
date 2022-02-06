
import { User } from '../models/User';
import passport from 'passport';
import PassportLocal from 'passport-local';
import PassportJWT from 'passport-jwt';
import { myHashCompare } from '../utility/helper' ;

const LocalStrategy = PassportLocal.Strategy;
const JWTStrategy = PassportJWT.Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    //session: false
  }, async(email, password, done) => {
      try {
          const userFound = await User.findOne({where: { email: email}});
          //console.log(userFound);
          if (userFound && myHashCompare( password, userFound?.getDataValue('password'))){    
                        
                done(null, userFound);
            }else{              
                done(null, false);
            }
      } catch (error) {
          done(error);
          //done(null, user)
      }
  });

passport.use(localStrategy);

//PASSPORT JWT
export interface Payload {
    userId: number;
    email: string;
}

const jwtSecret: string = process.env.JWT_SECRET as string;

const jwtStrategy = new JWTStrategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}, (payload: Payload, done) => {
    try {
        done(null, payload);
    } catch (error) {
        done(error);
    }
})

passport.use(jwtStrategy);
