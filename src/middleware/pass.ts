/* PASSPORT MIDDLEWARE
import { User } from '../models/User';
import passport from 'passport';
import PassportLocal from 'passport-local';
import { myHashCompare } from '../utility/helper' ;

const LocalStrategy = PassportLocal.Strategy;


const strategy = new LocalStrategy({
    usernameField: 'email'
  }, async(email, password, done) => {
      try {
          const userFound = await User.findOne({where: { email: email}});
          if (userFound && myHashCompare( password, userFound?.getDataValue('password'))){              
                done(null, userFound);
            }else{              
                done(null, false);
            }
      } catch (error) {
          done(error);
          
      }
  });

passport.use(strategy);

*/

//PASSPORT implementation
/* USERS ROUTE
import passport from 'passport';

const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpiry: number = 60 * 60 * 10;

export interface ReqUser extends Request{
     user?:{
          id?:number,
          email?: string,
          username?: string
     }
}

router.post('/login', passport.authenticate('local', 
          {session: false}), 
          async (req: ReqUser, res: Response) => {
   try{ 
               const token = jwt.sign({username: req.user?.username}, 
                    jwtSecret, 
                    { expiresIn: tokenExpiry} )
               res.json(token);
     }catch (error){
          console.log(error);
          res.status(500).json({  message:'Server error'});
     }
     
})
*/

/**Passport */
/*SERVER.TS
import './middleware/passport.middleware';

app.use(passport.initialize());
*/