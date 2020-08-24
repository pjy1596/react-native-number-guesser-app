import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
export default function App() {
  // 또 하나 신기한 것 발견! 즉 작동 방식은 일단 게임 화면(startGameScreen)에서 start를 누르면
  // <StartGameScreen> 화면이 실행되고 누르지 않았을 때는(즉 평소에는) <GameScreen>이 실행되는
  // 방식이다. 이를 위해 content라는 변수와 userNumber라는 state를 만들고 평소에는
  // startGameScreen으로 content를 놓고, state에서 정의한 userNumber가 정의되면(버튼눌름)
  // content를 GameScreen으로 바꿔줌
  const [userNumber, setUserNumber] = useState();
  // 몇 라운드인지 세주는 state
  const [guessRounds, setGuessRounds] = useState(0);
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  // 왜 이름이 startGameHandler냐면 startGameScreen에서 스타트 버튼 눌르면 작동하는 애라서
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  // 게임 할 때 몇 라운드인지 세주는 것도 state로 만들어 줌
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };
  let content = <StartGameScreen startGameHandler={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    // startGameScreen에서 정해준 번호인 userNumber를 이제 GameScreen으로 넘겨서
    // 저 번호 제외해줌
    content = (
      <GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  // header를 풀로 주려면 항상 플렉스 1을 주고 시작하는 게 좋음
  screen: {
    flex: 1,
  },
});
