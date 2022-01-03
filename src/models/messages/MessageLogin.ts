import Message from './Message';
import { AuthResponse} from '../../auth/auth.jwt';

interface MessageLogin extends Message {
    token: AuthResponse;
}

export default MessageLogin