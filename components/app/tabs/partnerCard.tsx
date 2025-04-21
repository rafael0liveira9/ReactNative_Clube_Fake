import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { Link, router, usePathname } from "expo-router";

export default function PartnerCard({ item, isFavorite, post }: any) {
  return (
    <Link
      href={{
        pathname: "/(tabs)/partner/[id]",
        params: { id: item.id.toString() },
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.card}>
          <Text style={styles.discount}>{item.discountAmount}% OFF</Text>

          <TouchableOpacity
            onPress={() => post(item.id.toString())}
            style={[
              styles.isFavorite,
              { borderColor: `${isFavorite ? "#E4EB0DEC" : "#E5E5E5FF"}` },
            ]}
          >
            {isFavorite ? (
              <AntDesign name="star" size={24} color="#E4EB0DEC" />
            ) : (
              <AntDesign name="staro" size={24} color="#E5E5E5FF" />
            )}
          </TouchableOpacity>

          <ImageBackground
            source={{
              uri: `https://clube-static.clubegazetadopovo.com.br/${item.cover}`,
            }}
            style={styles.cover}
            imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <Image
              source={{
                uri: `https://clube-static.clubegazetadopovo.com.br/${item.logo}`,
              }}
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.fantasyName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#34343400",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "100%",
    position: "relative",
  },
  cover: {
    height: 120,
    width: "100%",
  },
  content: {
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -40,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  discount: {
    marginTop: 8,
    fontSize: 16,
    backgroundColor: "#00A86B",
    color: "#ffffff",
    fontWeight: "600",
    position: "absolute",
    top: 0,
    left: 10,
    paddingVertical: 2,
    paddingHorizontal: 13,
    borderRadius: 8,
    zIndex: 1,
  },
  isFavorite: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 1,
    backgroundColor: "#fafafa",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 100,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
