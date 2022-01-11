import { ProfileDto } from '../dto/profile.dto';

export interface IProfileService{
    //findByEmailOrUsername: (email: string, username: string) => Promise<LoginUserDto | null>;
    getProfiles:(page: number, limit: number) => Promise<ProfileDto[]>;
    createProfile: ( profileDto: ProfileDto) => Promise<number>;
}