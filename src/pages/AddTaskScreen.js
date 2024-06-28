import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../themes/Colors';
import CustomButton from '../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenName from '../constants/ScreenName';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params || {};
  const [title, setTitle] = useState(data?.title || '');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.status || null);
  const [startDate, setStartDate] = useState(data?.startDate || '');
  const [endDate, setEndDate] = useState(data?.endDate || '');
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data ? 'Update Task' : 'Add Task'
    })
  },[navigation, data])

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };
  const handleConfirmStartDate = date => {
    setStartDate(date.toString());
    hideStartDatePicker();
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  const handleConfirmEndDate = date => {
    setEndDate(date.toString());
    hideEndDatePicker();
  };

  const handleAddTask = async () => {
    //gerekli alanları kontrol et

    if (!title || !startDate || !endDate || !value) {
      Toast.show({
        type:'info',
        text1:'Bilgi',
        text2:'lütfen tüm alanları doldurunuz',
        topOffset:60

      });
      return;
    }

    // Yeni ekleyeceğimiz task ın objesini oluşturduk.
    const newTask = {
      id: data?.id || uuid.v4(),
      title,
      startDate,
      endDate,
      status: value,
    };
    try {
      //AsyncStorage de tasks verileri varsa al
      const existingTasks = await AsyncStorage.getItem('tasks');
      //veri varsa bunu json çevir yoksada boş bir dizi ver
      let tasks = existingTasks ? JSON.parse(existingTasks) : [];

      if (data) {
        //* data varsa taskların idsi ile data id birbirine eşit ise yeni objeyi gönder değilse task kalsın.
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        //* data yoksa yeni oluşturulan veriyi tasks dizisine ekle
        tasks.push(newTask);
      }
      //veriyi AsyncStorage string olarak ekledik.
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      Toast.show({
        title:'succes',
        text1:data ? 'task güncellendi' : 'task eklendi',
        topOffset:60
      })

      //TaskList screene navigate ile yönlendik
      navigation.navigate(ScreenName.taskList);
    } catch (error) {
      console.log(error, 'Failed to save task');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <View style={styles.taskImageContainer}>
          <LottieView
            autoPlay
            loop
            style={{height: 150, width: '100%'}}
            source={require('../assets/animations/pencil.json')}
          />
        </View>
        <CustomTextInput
          imageSource={TaskNameIcon}
          onChangeText={setTitle}
          label={data ? 'update Task' : 'Save Task'}
          value={title}
        />
        <View style={{flexDirection: 'row'}}>
          <CustomTextInput
            onPressIcon={() => showStartDatePicker()}
            imageSource={TaskNameIcon}
            style={{width: '40%'}}
            label={'Başlangıç Zamanı'}
            onChangeText={setStartDate}
            isDate
            value={startDate}
          />
          <CustomTextInput
            onPressIcon={() => showEndDatePicker()}
            imageSource={TaskNameIcon}
            style={{width: '40%'}}
            label={'Bitiş Zamanı'}
            isDate
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{width: '90%'}}
              style={{
                borderWidth: 0,
              }}
            />
          </View>
        </View>
      </View>

      <CustomButton
        onPress={handleAddTask}
        label={'Save Task'}
        style={{width: '95%'}}
      />

      <DateTimePickerModal
        onCancel={hideStartDatePicker}
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmStartDate}
      />
      <DateTimePickerModal
        onCancel={hideEndDatePicker}
        isVisible={isEndDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmEndDate}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  inlineContainer: {
    width: '100%',
  },
  taskImageContainer: {
    marginTop: 60,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 210,
  },
  status: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
