import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import CustomInput from '@/components/ui/CustomInput';
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { FieldError, useForm } from "react-hook-form";
import { useState } from "react";
import CustomButton from '../../components/ui/CustomButton';

type FormData = {
    username: string;
}

const onSubmit = async (data: FormData) => {};

export default function ProfileRegScreen() {
    const router = useRouter();
    const { register: signUp, isLoading } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');

    const getErrorMessage = (error: FieldError | undefined): string | undefined => {
        return error?.message;
    };
    
    return (
    <ScreenWrapper>
    <ThemedView>
     <ThemedText>
         Let's get started 
     </ThemedText>

        <CustomInput
        control={control}
        label="Name"
        baseLabel="Your name"
        name="name"
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
        title="Enter"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.button}
        />

        </ThemedView>
        </ScreenWrapper>
    )
}

const styles = {
    button: {
        marginTop: 25,
    }
}