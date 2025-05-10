import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ScreenWrapper from "@/components/BaseWrappers/ScreenWrapper";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import { Controller, FieldError, useForm } from 'react-hook-form';
import { useAuth } from "../../hooks/useAuth";
import Timer from "@/components/ui/timer";
import CustomInput from "@/components/ui/Inputs/CustomInput";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { useLocalSearchParams } from "expo-router";

const RESEND_TIMEOUT = 600;

type FormData = {
  verificationCode: string;
};

export default function VerCode() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const { isLoading, verifyCode, sendCode, error } = useAuth();
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);

  const code = watch("verificationCode") || "";

  const onSubmit = (data: FormData) => {
    verifyCode(email, data.verificationCode);
  };

  useEffect(() => {
    if (!email) return;
  
    const sendVerificationCode = async () => {
      try {
        await sendCode(email);
      } catch (err: any) {
        console.error("Error sending code:", err);
      }
    };
  
    sendVerificationCode();
  }, [email]);

  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Verify your Email</ThemedText>

         {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        
        <Controller
          control={control}
          name="verificationCode"
          rules={{
            required: "Code is required",
            pattern: {
              value: /^\d{8}$/,
              message: "Code must be 8 digits"
            }
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              control={control}
              name="verificationCode"
              label="Verification Code"
              error={errors.verificationCode?.message}
              value={value}
              onChange={onChange}
              keyboardType="numeric"
              maxLength={8}
            />
          )}
        />

        <CustomButton
          title="Verify"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />

        <CustomButton
          title={timeLeft > 0 ? `Resend code in:` : "Resend Code"}
          onPress={() => console.log("Resend logic here")}
          style={styles.resendButton}
          variant="secondary"
          loading={isLoading}
        />

        {timeLeft > 0 && (
          <ThemedView style={styles.innerContainer}>
            <Timer time={timeLeft} onTick={setTimeLeft} />
          </ThemedView>
        )}

      </ThemedView>

      <Text style={styles.description}>
          We just sent a code to your email. Enter it below to verify your identity.
      </Text>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 45,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    margin: 15,
    marginBottom: 50,
    color: 'white',
  },
  error: {
    color: '#ff0000',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  resendButton: {
    marginTop: 16,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
});
