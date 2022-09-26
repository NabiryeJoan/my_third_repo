// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
    
//     <title>Results</title>
//     <link rel="stylesheet" href="style.css">
    
//     <h1>
//         NABIRYE JOAN
//         S21B13/066
//     </h1>
//        <h2> REGISTATION FORM</h2>
// </head>
// <body>
//     <form action="results.html" method="GET" enctype="multipart/form-data">
//         <div class="input_field"> 
//         <label for="name">Name</label>
//         <input type="text" name="password" id="name" placeholder="user name" required >
//         </div><br>
//     <div>
//         <label for="password">password</label>
//         <input type="password" name="name" id="password" placeholder="password" required>
//     </div><br>
//     <div>
//         <label for="Phone">Phone</label>
//         <input type="tel" name="Phone" id="contant"  placeholder="contact" required>
//     </div><br>
//     <div>
//         <label for="age">Age</label>
//         <input type="number" name="age" id="age"  placeholder="age" min="1" max="50" step="1">
//     </div>
//     <div><br>
//         Gender
//     <div>
//         <label for="male">male</label>
//         <input type="radio" name="gender" id="male"  >
//     </div><br>
//     <div>
//         <label for="Female">Female</label>
//         <input type="radio" name="gender" id="Female"  >
//     </div><br>
// </div>
// <div>
//     <label for="bio">Bio</label>
//     <textarea id="bio" name="bio"></textarea>
// </div><br>
//     <div>
//         <label for="date">Birthdate</label>
//         <input type="date" name="date" id="date">
//     </div><br>
//     <div>
//         <label for="email">email</label>
//         <input type="email" name="email" id="email"  placeholder="email" required>
//     </div><br>
//     <div>
//         <label for="file">file</label>
//         <input type="file" name="file" id="file"  >
//     </div><br>
//     <div>
//         <button type="reset" >Reset</button>
//         <button type="register" >Register</button>
//     </div><br>
//     </form>
//     <p>Thanks for registering with us </p>
// </body>
// </html>*/ -->




import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {createNewUser} from '../actions/RegisterActions';
import {useNavigation} from '@react-navigation/native';

function RegisterScreen(props) {

  const navigation = useNavigation();

  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: '',
    checkTextInputChange: false,
    isValidEmail: true,
    isValidPassword: true,
    isValidCPassword: true,
  });

  useEffect(() => {
    if (props.userDetails !== undefined && props.userDetails !== null) {
      navigation.navigate('Dashboard');
    }
  }, [props.userDetails]);

  const handleFirstName = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        firstName: val,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        checkTextInputChange: false,
      });
    }
  };

  const handleLastName = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        lastName: val,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        checkTextInputChange: false,
      });
    }
  };

  const handleEmailChange = (val) => {
    let reg = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (reg.test(val)) {
      setData({
        ...data,
        email: val,
        checkTextInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkTextInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val === data.password){
    setData({
      ...data,
      cPassword: val,
      isValidCPassword: true,
    });
  } else {
    setData({
      ...data,
      cPassword: val,
      isValidCPassword: false,
    });
  }
  };

  const handleRegistration = (firstName, lastName, email, password, cPassword) => {

  if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && cPassword !== ''){
    props.dispatch(createNewUser(firstName, lastName, email, password, cPassword));

  }
  

  };

  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.heading}>ESOMELO</Text>
      {props.registerionError ? (
        <View >
          <Text style={styles.errorMsg}>{props.registrationError}</Text>
        </View>
      ) : null}

      <Input
        style={styles.inputBox}
        placeholder="First Name"
        onChangeText={(val) => handleFirstName(val)}
      />

      <Input
        style={styles.inputBox}
        placeholder="Last Name"
        onChangeText={(val) => handleLastName(val)}
      />

      <Input
        style={styles.inputBox}
        placeholder="Enter email"
        autoCapitalize="none"
        onChangeText={(val) => handleEmailChange(val)}
      />
      {data.isValidEmail ? null : (
        <Text style={styles.errorMsg}>Incorrect email</Text>
      )}

      <Input
        style={styles.inputBox}
        placeholder="Enter password"
        onChangeText={(val) => handlePasswordChange(val)}
        secureTextEntry={true}
      />
      {data.isValidPassword ? null : (
        <Text style={styles.errorMsg}>Password must be 5 characters long!</Text>
      )}

      <Input
        style={styles.inputBox}
        placeholder="Confirm password"
        onChangeText={(val) => handleConfirmPasswordChange(val)}
        secureTextEntry={true}
      />
      {data.isValidCPassword ? null : (
        <Text style={styles.errorMsg}>Password does not match!</Text>
      )}

      <Button
        title="Register"
        containerStyle={{
          marginHorizontal: 10,
        }}
        onPress={() => { handleRegistration(data.firstName, data.lastName, data.email, data.password, data.cPassword);}}
        loading={props.registering}
      />
      <Text style={styles.textColor2}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Login</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>

  );
}

function mapStateToProps(state) {
  return {
    authenticating: state.user.registering,
    registerionError: state.user.registrationError,
    userDetails: state.user.userDetails,
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    padding:20,
    color: 'rgb(0, 26, 13)',
  },

  loginLink: {
    color: 'blue',
    marginBottom:10,
  },

  textColor2: {
    marginTop: 20,
    color: '#000',
  },

  inputBox: {
    width: 300,
    backgroundColor: '#455a64',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },

  errorMsg: {
    color: 'red',
  },

});

export default connect(mapStateToProps)(RegisterScreen);