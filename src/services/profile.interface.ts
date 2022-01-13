import { ProfileDto } from '../dto/profile.dto';

export interface IProfileService{
    createProfile: ( profileDto: ProfileDto) => Promise<number>;
    getProfiles:(page: number, limit: number) => Promise<ProfileDto[]>;    
    getProfileById:(id: string) => Promise<ProfileDto | null>;
    getProfileByUserId: ( userId: string) => Promise<ProfileDto | null>;
    putProfile: (profileDto: ProfileDto) => Promise<ProfileDto | null>;
    deleteById: ( id: string ) => Promise<void>;
}