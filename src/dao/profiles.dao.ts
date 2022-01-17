import { ProfileDto, createProfileDto } from '../dto/profile.dto';
import { ProfileModel, Profile} from '../models/Profile';
import { User } from '../models/User';

class ProfilesDao{
    createProfile = async (profileDto: ProfileDto): Promise<number> => {
        const profile: ProfileModel = await Profile.create(profileDto);
        return profile.id;
    }

    getProfiles = async ( page: number, limit: number): Promise<ProfileDto[]> => {
        const profiles: ProfileModel[] | null= await Profile.findAll(            
                {
                    offset: page *limit | 0, 
                    limit:limit | 20,
                    include:[ {model: User }]
                 }
            );
        //profiles.map(profile => console.log(profile.toJSON()));
        return profiles.map(profile => 
            createProfileDto( profile.id, profile.name, profile.profilePhoto, profile.status, profile.getDataValue('User')));
    }

    getProfileById = async ( profileId: string ): Promise<ProfileDto | null> => {
        const profile: ProfileModel | null  = await Profile.findByPk(profileId, {
            include:[ {model: User }],
        });
        return profile? createProfileDto(profile.id, profile.name, profile.profilePhoto, profile.status, 
            profile.getDataValue('User')): null;
    }   

    getProfileByUserId = async ( userId: string):Promise<ProfileDto | null> => {
        const profile: ProfileModel | null = await Profile.findOne({ where: { UserId: Number(userId)},
            include:[ {model: User }], 
        })
        return profile? createProfileDto( profile.id, profile.name, profile.profilePhoto, profile.status, 
            profile.getDataValue('User')): null;
    }

    updateProfileById = async (profileDto: ProfileDto): Promise<ProfileDto | null> => {
         await Profile.update({ name: profileDto.name, profilePhoto: profileDto.profilePhoto}, {
             where: { 
              id: profileDto.id,   
             }
         })
         const updatedProfile: ProfileModel | null= await Profile.findByPk(profileDto.id, {
              include:[ {model: User }],
        });
        return updatedProfile? createProfileDto(updatedProfile.id, updatedProfile.name, 
            updatedProfile.profilePhoto, updatedProfile.status, updatedProfile.getDataValue('User')) : null;
     
    }

    deleteById = async ( profileId: string): Promise<void> => {
            await Profile.destroy({ where: { id: profileId}});
    }

}

export default new ProfilesDao();