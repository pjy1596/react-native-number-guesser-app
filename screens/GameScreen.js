import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    // 랜덤 번호 뽑는 함수 만들기
    //   혹시 랜덤 번호하고 선택한 거 하고 겹치면 그냥 한 번 더 랜덤픽 돌리게
    // 이렇게 함수 내에서 함수 같은 거 또 돌리는 걸 recursion이라고 함
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = ({ userChoice, gameOverHandler }) => {
  // 맨 처음 숫자 1~100 사이로 아무거나 정함
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  // useRef는 계속 변하는 값을 저장하는 박스임. 여기서는 버튼 누를 때마다
  // 낮은 값과 높은 값이 변하게 저장해야 하므로 이거 써줌. 쓰는 방법도 보다시피
  //  쉽다. 접근할 때는 .current 해주면 된다
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // useeffect에 있는 내용은 다른 것들이 다 실행되고 난 이후에 실행됨.
  // await 같은 거 말고도 되는가 봄 / effect의 디폴트는 뭐가 변할 때마다 계속
  // 재생성되는 것임. 하지만 그럴 필요는 없으므로 여기서는 두 번째 param인
  // cg, uc, goh가 변할 때만 업데이트 되게 만들어 줌
  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(rounds);
    }
  }, [currentGuess, userChoice, gameOverHandler]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Do not lie", "You know this is wrong", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          onPress={nextGuessHandler.bind(this, "lower")}
        ></Button>
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        ></Button>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
export default GameScreen;
