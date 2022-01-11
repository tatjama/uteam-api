import { ProfileDto, createProfileDto } from '../dto/profile.dto';
import { ProfileModel, Profile } from '../models/Profile';
import { User } from '../models/User';

class ProfilesDao{
    getProfiles = async ( page: number, limit: number): Promise<ProfileDto[]> => {
        const profiles: ProfileModel[] = await Profile.findAll(            
            {
                offset: page *limit | 0, 
                limit:limit | 20,
                include:[ {model: User }]
            }
            );
        console.log('profile dao');
        profiles.map(profile => console.log(profile.toJSON()));
        return profiles.map(profile => 
            createProfileDto( profile.id, profile.name, profile.profilePhoto, profile.status, profile.getDataValue('User')));
    }

    createProfile = async (profileDto: ProfileDto): Promise<number> => {
        const profile: ProfileModel = await Profile.create(profileDto);
        return profile.id;
    }
    
}

export default new ProfilesDao();