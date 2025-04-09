import { ThemedText } from "@/app-example/components/ThemedText";
import MoneyBag from '../assets/images/Money bag.svg'
import { ThemedView } from "./ui/ThemedView";
import { StyleSheet } from "react-native";

type Props = {
    label: string,
}

export default function BaseHeader({label} : Props) {
    return (
    <ThemedView 
    style = {
        styles.container
    }
    >
        <ThemedText 
         type="title"
        >
         {label}
        </ThemedText>

      <ThemedView
      style = {
        styles.money
      } 
      >
        <ThemedText>
            0 gg
        </ThemedText>
        <MoneyBag width={35} height={35}/>
       </ThemedView>
    </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    money: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-end'
    }
})