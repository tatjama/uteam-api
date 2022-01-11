import { ProfileDto } from '../dto/profile.dto';

export interface IProfileService{
    createProfile: ( profileDto: ProfileDto) => Promise<number>;
    getProfiles:(page: number, limit: number) => Promise<ProfileDto[]>;    
    getProfileById:(id: string) => Promise<ProfileDto>;
}