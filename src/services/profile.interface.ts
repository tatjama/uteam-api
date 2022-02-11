import { ProfileDto } from '../dto/profile.dto';
import { ProfileUpdateDto} from '../dto/profile.update.dto';
export interface IProfileService{
    createProfile: ( profileCreateDto: ProfileUpdateDto) => Promise<number>;
    getProfiles:(page: number, limit: number) => Promise<ProfileDto[] | []>;    
    getProfileById:(id: string) => Promise<ProfileDto | null>;
    isProfileExistByUserId: (userId: string) => Promise<boolean>;
    isProfileNameExists:(name: string) => Promise<boolean> ;
    putProfile: (profileUpdateDto: ProfileUpdateDto) => Promise<ProfileDto | null>;
    deleteById: ( id: string ) => Promise<void>;
}