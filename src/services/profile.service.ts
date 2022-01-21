import { ProfileDto } from '../dto/profile.dto';
import { IProfileService } from './profile.interface';
import ProfilesDao from '../dao/profiles.dao';

class ProfileService implements IProfileService{

    createProfile = async(profileDto: ProfileDto): Promise<number> => {
        return ProfilesDao.createProfile(profileDto);
    }
    
    getProfiles = async (page: number, limit: number): Promise<ProfileDto[] | []> => {
        return ProfilesDao.getProfiles(page, limit);
    }

    getProfileById = async (id: string): Promise<ProfileDto | null> => {
        return ProfilesDao.getProfileById(id);        
    }

    /*getProfileByUserId = async (userId: string): Promise<ProfileDto | null> => {
        return ProfilesDao.getProfileByUserId(userId);
    }*/

    isProfileExistByUserId = async(userId: string): Promise<boolean> => {
        return ProfilesDao.isProfileExistByUserId(userId);
    }

    putProfile = async (profileDto: ProfileDto): Promise<ProfileDto | null> => {
        return ProfilesDao.updateProfileById(profileDto);
    }

    deleteById = async (id: string): Promise<void> => {
         ProfilesDao.deleteById(id);
    }
}

export default new ProfileService();