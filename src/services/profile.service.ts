import { ProfileDto } from '../dto/profile.dto';
import { IProfileService } from './profile.interface';
import ProfilesDao from '../daos/profiles.dao';

class ProfileService implements IProfileService{
    getProfiles = async (page: number, limit: number): Promise<ProfileDto[]> => {
        return ProfilesDao.getProfiles(page, limit);
    }

    createProfile = async(profileDto: ProfileDto): Promise<number> => {
        console.log(profileDto);
        return ProfilesDao.createProfile(profileDto);
    }
}

export default new ProfileService();