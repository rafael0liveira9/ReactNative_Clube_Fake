import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    alignItems: "center",
  },
  header: {
    margin: 0,
    padding: 0,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%",
    height: 150,
  },
  logo: {
    margin: 0,
    padding: 0,
    width: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  warning: {
    backgroundColor: "#B80000FF",
    color: "#ffffff",
    // textTransform: "uppercase",
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 10,
    position: 'absolute',
    top: 10,
    right:10
  },
  logoutBtn: {
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 25,
    left: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  logoutTxt: {
    fontSize:10
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: -24,
  },
  tabContainer: {
    width: "100%",
    margin: 0,
    paddingHorizontal: 10,
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  authTitle: {
    fontSize: 26,
    fontWeight: 600,
    color: "#333333",
    marginBottom: 30,
  },
  authInfoLinkText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#203EFFFF",
    marginBottom: 30,
    marginTop: 40,
  },
  logoutInfoLinkText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#203EFFFF",
    marginBottom: 30,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: "#203EFFFF",
  },
  errorBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 0,
    padding: 0,
    paddingBottom: 15,
    color: "#FF0000FF",
  },
  errorText: {
    fontSize: 10,
    color: "#FF0000FF",
  },
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: '60%'
    
  },
  searchIcon: {
    marginRight: 8,
    width: 20
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  pickerContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 16,
    width: '40%'
  },
  picker: {
    height: 50,
    width: "100%",
  },
  parceirosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    paddingTop: 15
  },
  tabBar: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: 60,
  backgroundColor: "#fff",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
tabButton: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
tabText: {
  fontSize: 12,
  color: "gray",
  },
separatorView: {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 30, 
  paddingRight: 20
  },
  infoBox: {
    // borderColor: 'black',
    // borderWidth: 1, 
    // borderStyle: 'solid',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,

}
});
