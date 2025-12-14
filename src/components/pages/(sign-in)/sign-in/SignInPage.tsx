"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useSignIn } from "./use-sign-in";

const SignInPage = () => {
  const { isSubmitting, register, handleSubmit, errors } = useSignIn();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      px="4"
    >
      <Container maxW="sm">
        <VStack>
          {/* Header */}
          <Flex w="full" justify="space-between" align="center">
            <VStack align="start">
              <Heading fontSize="2xl" fontWeight="bold">
                Login
              </Heading>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Entre com suas credenciais
              </Text>
            </VStack>
            <ColorModeButton />
          </Flex>

          {/* Form Container */}
          <Box
            w="full"
            p="8"
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="lg"
            boxShadow="sm"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing="6">
                {errors.root && (
                  <Box
                    w="full"
                    p="3"
                    bg="red.50"
                    _dark={{ bg: "red.900" }}
                    borderRadius="md"
                    borderLeft="4px"
                    borderColor="red.500"
                  >
                    <Text
                      fontSize="sm"
                      color="red.600"
                      _dark={{ color: "red.200" }}
                    >
                      {errors.root.message}
                    </Text>
                  </Box>
                )}
                {/* Email Input */}
                <VStack w="full" align="start" spacing="2">
                  <Text fontSize="sm" fontWeight="medium">
                    Email
                  </Text>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    size="lg"
                    {...register("email", { required: true })}
                  />
                </VStack>

                {/* Password Input */}
                <VStack w="full" align="start" spacing="2">
                  <Flex w="full" justify="space-between">
                    <Text fontSize="sm" fontWeight="medium">
                      Senha
                    </Text>
                    <ChakraLink
                      href="/forgot-password"
                      fontSize="xs"
                      color="blue.600"
                      _dark={{ color: "blue.400" }}
                    >
                      Esqueceu?
                    </ChakraLink>
                  </Flex>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    size="lg"
                    {...register("password", { required: true })}
                  />
                </VStack>

                {/* Submit Button */}
                <Button
                  w="full"
                  size="lg"
                  colorScheme="blue"
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Entrando..."
                >
                  Entrar
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Sign Up Link */}
          <HStack>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              Não tem conta?
            </Text>
            <ChakraLink
              fontSize="sm"
              fontWeight="bold"
              color="blue.600"
              _dark={{ color: "blue.400" }}
            >
              Cadastre-se
            </ChakraLink>
          </HStack>
        </VStack>
      </Container>
    </Flex>
  );
};

export default SignInPage;
