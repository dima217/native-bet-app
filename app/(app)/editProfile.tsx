import BaseHeader from "@/components/BaseHeader";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { ImagePickerButton } from "@/components/ui/ImagePickerButton";
import { ThemedView } from "@/components/ui/ThemedView";
import { useImagePicker } from "@/hooks/useImagePicker";
import { FieldError, useForm } from "react-hook-form";
import { Alert, StatusBar, StyleSheet, Image as RNImage } from 'react-native';

type Props = {
    loadImage: string;
}

type FormData = {
    username: string
}

export default function EditProfileScreen({ loadImage }: Props) {

    const defaultUri = RNImage.resolveAssetSource(
        require("../../assets/images/Def-Ava.png")
    ).uri;

    loadImage = defaultUri;

    const { image, pickImage } = useImagePicker();
    const displayedImage = loadImage || image;
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const getErrorMessage = (error: FieldError | undefined): string | undefined => {
        return error?.message;
    };

    return (
        <>
        <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

            <BaseHeader 
            label='Edit account'
            goBack={true}
            />

            <ThemedView
            style={
                styles.innerContainer
            }
            >
                <ImagePickerButton 
                    onPress={pickImage}
                    image={displayedImage}

                />

                 <CustomInput
                 control={control}
                 name="password"
                 placeholder="Username"
                 rules={{
                required: 'Name is required',
                minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                },
                maxLength: {
                    value: 50,
                    message: 'Name cannot exceed 50 characters'
                },
                pattern: {
                    value: /^[\p{L}\s'-.]{2,50}$/u,
                    message: 'Invalid name format'
               }
               }}
                error={getErrorMessage(errors.username)}
              />

            <CustomButton
            title="Save changes"
            onPress={() => {Alert.alert('Happy')}}
            />
            </ThemedView>
        </>
    ); 
}

const styles = StyleSheet.create ({
    innerContainer: {
        marginTop: 50,
        paddingHorizontal: 45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})
