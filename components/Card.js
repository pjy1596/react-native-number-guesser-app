import React from "react";
import { View, StyleSheet } from "react-native";
// 이 Card를 만든 이유는 reusable한 스타일을 만들고 싶어서. 여기서 만들어 논 스타일은
// 어디에서나 재사용 가능. 스타일도 다른 스타일과 merge해서 합쳐 쓸 수 있다는 거 알게됨
// children 기억나지? 태그 사이에 칠드런 쓰던 거.
const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow는 ios에서만 먹힘. 그래서 안드로이드는 elevation도 써줘야 됨
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
export default Card;
