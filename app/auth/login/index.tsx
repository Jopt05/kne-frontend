import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, textTypes } from "../../../constants/styles";
import Title from "../../../components/Title";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function LoginScreen() {

  const { signIn, signUp, errorMessage, isLoading } = useContext( AuthContext );

  const [isRegistering, setIsRegistering] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  })

  const onChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  const handleChangeAction = () => {
    setIsRegistering(!isRegistering);
  }

  const handleSubmit = () => {
    if( isRegistering ) {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  const handleRegister = async() => {
    if( form.email === '' || form.password === '' || form.username === '' ) {
      setHasErrors(true);
      return;
    }; 
    await signUp({
      email: form.email,
      password: form.password,
      username: form.username
    })
  }

  const handleLogin = async() => {
    if( form.email === '' || form.password === '' ) {
      setHasErrors(true);
      return;
    }; 

    await signIn({
      email: form.email,
      password: form.password
    })
  }

  return (
    <View style={styles.container}>
      <Title text="kne App"/>      
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>
          Bienvenido, cuajado
        </Text>
        <Text style={styles.formLabel}>
          Email
        </Text>
        <TextInput 
          placeholder="Ingresa tu email"
          placeholderTextColor={colors.third}
          onChangeText={(value) => onChange(value, 'email')}
          style={{
            ...styles.formInput,
            ...(hasErrors && !form.email && styles.invalidInput)
          }}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardAppearance="dark"
        />
        <Text style={{
          ...styles.formLabel,
          ...(!isRegistering && styles.hidden)
        }}>
          Username
        </Text>
        <TextInput 
          placeholder="Ingresa tu username"
          onChangeText={(value) => onChange(value, 'username')}
          placeholderTextColor={colors.third}
          style={{
            ...styles.formInput,
            ...(!isRegistering && styles.hidden),
            ...(hasErrors && !form.username && styles.invalidInput)
          }}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardAppearance="dark"
        />
        <Text style={styles.formLabel}>
          Password
        </Text>
        <TextInput 
          placeholder="Ingresa tu password"
          onChangeText={(value) => onChange(value, 'password')}
          placeholderTextColor={colors.third}
          style={{
            ...styles.formInput,
            ...(hasErrors && !form.password && styles.invalidInput)
          }}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardAppearance="dark"
        />
        <Text style={{
          ...styles.errorMessage,
          ...(!errorMessage && styles.hidden)
        }}>
          { errorMessage }
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          style={styles.formButton}
          onPress={() => handleSubmit()}
        >
          {
            (!isLoading) ? (
              <Text style={styles.formButtonText}>
                { (isRegistering) ? 'Registrarse' : 'Iniciar sesión' }
              </Text>
            ) : (
              <ActivityIndicator />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChangeAction()}
        >
          <Text style={styles.formCreateAccount}>
          { (isRegistering) ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Registrate' }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60
  },
  formContainer: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '80%',
    backgroundColor: colors.third,
    borderRadius: 10,
    marginTop: 20,
  },
  formHeader: {
    marginVertical: 2,
    fontFamily: textTypes.bold,
    fontSize: 16,
    color: colors.fourth,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 14,
    color: colors.fourth,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: textTypes.regular
  },
  formInput: {
    fontSize: 14,
    color: colors.fourth,
    backgroundColor: colors.primary,
    fontFamily: textTypes.regular,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  invalidInput: {
    borderColor: 'darkred',
    borderWidth: 1
  },
  formButton: {
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    marginTop: 20,
    borderWidth: 0
  },
  formButtonText: {
    fontSize: 14,
    fontFamily: textTypes.regular,
    color: colors.fourth,
    textAlign: 'center'
  },
  formCreateAccount: {
    fontSize: 12,
    fontFamily: textTypes.regular,
    color: colors.fourth,
    textAlign: 'right',
    marginTop: 20
  },
  errorMessage: {
    fontSize: 14,
    color: 'darkred',
    textAlign: 'center',
    marginTop: 10
  },
  hidden: {
    display: 'none'
  }
})