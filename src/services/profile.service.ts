import { ProfileDto } from '../dto/profile.dto';
import { IProfileService } from './profile.interface';
import ProfilesDao from '../dao/profiles.dao';

class ProfileService implements IProfileService{
    createProfile = async(profileDto: ProfileDto): Promise<number> => {
        return ProfilesDao.createProfile(profileDto);
    }
    
    getProfiles = async (page: number, limit: number): Promise<ProfileDto[]> => {
        return ProfilesDao.getProfiles(page, limit);
    }

    getProfileById = async (id: string): Promise<ProfileDto> => {
        return ProfilesDao.getProfileById(id);        
    }
}

export default new ProfileService();