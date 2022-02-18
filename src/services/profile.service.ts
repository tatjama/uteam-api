import { ProfileDto } from '../dto/profile.dto';
import { ProfileUpdateDto } from '../dto/profile.update.dto';
import { IProfileService } from './profile.interface';
import ProfilesDao from '../dao/profiles.dao';

class ProfileService implements IProfileService{

    createProfile = async(profileCreateDto: ProfileUpdateDto): Promise<number> => {
        return ProfilesDao.createProfile(profileCreateDto);
    }
    
    getProfiles = async (page: number, limit: number): Promise<ProfileDto[] | []> => {
        return ProfilesDao.getProfiles(page, limit);
    }

    getProfileById = async (id: string): Promise<ProfileDto | null> => {
        return ProfilesDao.getProfileById(id);        
    }

    isProfileExistByUserId = async(userId: string): Promise<boolean> => {
        return ProfilesDao.isProfileExistByUserId(userId);
    }

    isProfileNameExists = async (name: string): Promise<boolean> => {
        return ProfilesDao.isProfileNameExists(name);
    }

    putProfile = async (profileDto: ProfileUpdateDto): Promise<ProfileDto | null> => {
        return ProfilesDao.updateProfileById(profileDto);
    }

    deleteById = async (id: string): Promise<void> => {
         ProfilesDao.deleteById(id);
    }
}

export default new ProfileService();