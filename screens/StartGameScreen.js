import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  //   여기서 기억해야 하는 것은 state를 세 개나 만들어줬다는 것. 물론 이렇게까지 할
  // 필요는 없지만 어쨌든 함. 기본 원리는 reset 버튼 누르면 다시 시작, confirm 버튼 누르면
  // 아까 만들어 논 card안에 you selected ~로 누른 숫자 뜨게 + 키보드 사라지게 + 입력한 숫자
  //   저장되게 // Number 없애고 state 두 개만으로도 실험해 봤으나 안 먹힘. 결론은 한 state 당
  //   하나의 역할만 수행하니 enteredValue는 평소 하던대로 입력만 담당하게 놔두고, 숫자를 담당하는
  // state는 또 하나 만드는 게 낫다 / useState 빈칸으로 설정할 때 괄호 안에 아무것도 안 넣건
  //   "" 넣건 똑같다
  const numberInputHandler = (inputText) => {
    //   이 밑에 replace 사실 안해도 되긴 하나 숫자 말고 다른 거 입력 못하게 만들려고
    // 해 놓음. 소수점도 입력 못하게
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    //   기본적으로 textInput에 입력되는 애들은 string이어서 바꿔줘야 됨
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
      //   흥미로운 사실 발견!!! 여기서 return의 의미는 그냥 더 이상 진행안하고 끝내버린다
      // 라는 의미이다. 그러므로 return 안 써주면 밑에 애들도 실행은 되서 정답박스가 보이게 됨
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* 밑에 얘는 app.js의 함수와 연결. 즉 이 버튼을 누르면 onStartGame 시행됨 */}
        <Button
          title="START GAME"
          //   어쨌든 여기 startGameHandler도 prop으로 넘겨서 온 애니까 props라고 적어줘야
          // 한다.
          onPress={() => props.startGameHandler(selectedNumber)}
        />
      </Card>
    );
  }
  return (
    //   화면 다른 곳 누르면 키보드 사라지게 만드는 방법 => tourhablewofb로 다 감싸준 다음에
    // 그거 누르면 키보드가 dismiss 되게 써주기. keyboard도 import 해야됨
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            input={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            //   숫자 두 자리 까지만 입력할 수 있게 만들어 줌
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    // horizontally 하게 해줌. 왜냐면 디폴트가 column으로 돼있음
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    // 약간의 responsiveness 줌
    alignItems: "center",
    // 역시나 horizontally
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
export default StartGameScreen;
