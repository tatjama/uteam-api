import passport from 'passport';
import PassportLocal  from 'passport-local';
import PassportJWT from 'passport-jwt';
import { Op} from 'sequelize';
import { User, UserModel } from '../../models/User';
import { createLoginUserDto, LoginUserDto } from '../../dto/user.dto';
import { myHashCompare } from '../../utility/helper' ;

const LocalStrategy = PassportLocal.Strategy;
const JWTStrategy = PassportJWT.Strategy;

//PASSPORT LOCAL
const localStrategy: PassportLocal.Strategy = new LocalStrategy({
    usernameField: 'usernameField' 
  }, async(usernameField: string,
     password: string, 
     done: (error: null | unknown, user?: LoginUserDto | false) => void ) => {

        try {
            const userFound: UserModel | null = await User.findOne({ 
                  where: {[Op.or]:[{ email: usernameField },{ username: usernameField }]} 
            });
            if (userFound && myHashCompare( password, userFound?.getDataValue('password'))){      
                    const validUser: LoginUserDto = createLoginUserDto(userFound.username);                       
                    done(null, validUser);
                }else{              
                    done(null, false);
                }
        } catch (error) {
              done(error);
        }
  });


//PASSPORT JWT STRATEGY
export interface Payload {
    userId: number;
    email: string;
}

const jwtSecret: string = process.env.JWT_SECRET as string;

const jwtStrategy: PassportJWT.Strategy = new JWTStrategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }, (payload: Payload, done: (error: null | unknown, payload?: Payload) => void) => {
    
            try {
                done(null, payload);
            } catch (error) {
                done(error);
            }
});

passport.use(localStrategy);
passport.use(jwtStrategy);
