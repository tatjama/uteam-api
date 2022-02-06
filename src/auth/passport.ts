import passport from 'passport';
import * as passportLocal from 'passport-local';
import UsersDao from '../dao/users.dao';
import { User,  UserModel } from '../models/User';
import { myHashCompare } from '../utility/helper';
const LocalStrategy = passportLocal.Strategy;
/*const customFields = {
    usernameField: req.body.username,
    passwordField: req.body.password
}*/



/*const validPassword = async( hashedPassword: string,password: string) =>  {
    if(myHashCompare(hashedPassword, password)){
        return password;
    } else{
        return null
    }
}*/


/*verifyLogin = async(email: string, username: string, password: string): Promise<UserDto | null> => {
    const user: UserModel | null = await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
    if(user){
      if( myHashCompare(password, user.password)){
        return createUserDto(user.id, user.username, user.email, user.role)
        }else{
        return null  
   }
    }else{
        return null
    }
  }*/

const  verifyCallback = async (username: string, password: string, done: any) =>  {
    //const user=  {id: "3", username: 'user1', password: 'password'};
    const user= await User.findOne({where: {username: username }});

    if(!user){ return done(null, false, { message: 'User not found' })}

    //const isValid = validPassword(user.password, password);
    
    console.log("------------");
    console.log("------------");
    console.log("------------");
    console.log(user);
    //if (isValid)(user.password, password){
    if(myHashCompare(user.password, password)){ 
        console.log("============")
        console.log(user)
        return done(null, user, { message: 'Logged in Successfully' });
        return done(null, user);
    }else{
        return done(null, false, { message: 'Wrong Password' });
        return done(null, false);
    }      
}


const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, verifyCallback);

/*passport.serializeUser((user, done) => {
    return done(null, user.id);
})*/

passport.deserializeUser(async (userId: string, done) => {
    try{
        const user  = await User.findByPk(userId);
        if(user){
            done(null, user);
        } 
    }catch(err){
        done(err);
    }
    
})


/*passport.deserializeUser((userId:string, done) => {
    User.findByPk(userId).then((user) => {
        done(null,user);
    })
});*/


passport.use(strategy);

/*passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );*/

export default passport;



/*interface IStrategyOptions {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback?: false | undefined;
}

interface IStrategyOptionsWithRequest {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

interface IVerifyOptions {
    message: string;
}

interface VerifyFunctionWithRequest {
    (
        req: express.Request,
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
    ): void;
}

interface VerifyFunction {
    (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
    ): void;
}

declare class Strategy extends LocalStrategy {
    constructor(
        options: IStrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest
    );
    constructor(options: IStrategyOptions, verify: VerifyFunction);
    constructor(verify: VerifyFunction);

    name: string;
}*/


