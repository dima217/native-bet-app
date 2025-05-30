import { useRef, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onReward: () => void;
};

export default function VideoAdModal({ visible, onClose, onReward }: Props) {
  const videoRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.didJustFinish && !isFinished) {
      setIsFinished(true);
      onReward();
    }
  };

  const handleClose = () => {
    setIsFinished(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={styles.fullscreen}>
        <Video
          ref={videoRef}
          source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isMuted={false}
          style={styles.video}
          onPlaybackStatusUpdate={handleStatusUpdate}
          useNativeControls={false} 
        />

        {isFinished && (
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={36} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
  },
});
