// "use client";

// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   Button,
//   Divider,
//   useDisclosure,
//   Drawer,
//   DrawerBody,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   IconButton,
//   Flex,
// } from "@chakra-ui/react";
// import Link from "next/link";
// import { useState } from "react";

// interface NavItem {
//   label: string;
//   href: string;
//   icon?: string;
// }

// const navItems: NavItem[] = [
//   { label: "Dashboard", href: "/dashboard", icon: "📊" },
//   { label: "Perfil", href: "/profile", icon: "👤" },
//   { label: "Configurações", href: "/settings", icon: "⚙️" },
//   { label: "Ajuda", href: "/help", icon: "❓" },
// ];

// export const Sidebar = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [activeItem, setActiveItem] = useState("Dashboard");

//   const SidebarContent = (
//     <VStack spacing="0" align="stretch" h="full">
//       {/* Logo/Header */}
//       <Box p="6" borderBottom="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
//         <HStack spacing="3">
//           <Box
//             w="10"
//             h="10"
//             bg="blue.500"
//             borderRadius="lg"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             color="white"
//             fontWeight="bold"
//             fontSize="lg"
//           >
//             H
//           </Box>
//           <VStack align="start" spacing="0">
//             <Text fontSize="sm" fontWeight="bold">
//               Hefesto
//             </Text>
//             <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
//               Admin Portal
//             </Text>
//           </VStack>
//         </HStack>
//       </Box>

//       {/* Navigation Items */}
//       <VStack spacing="2" align="stretch" flex="1" p="4">
//         {navItems.map((item) => (
//           <Link key={item.href} href={item.href}>
//             <Button
//               w="full"
//               justify="start"
//               variant={activeItem === item.label ? "solid" : "ghost"}
//               colorScheme={activeItem === item.label ? "blue" : "gray"}
//               onClick={() => setActiveItem(item.label)}
//               fontSize="sm"
//             >
//               <Text mr="3">{item.icon}</Text>
//               {item.label}
//             </Button>
//           </Link>
//         ))}
//       </VStack>

//       {/* Footer */}
//       <Box p="4" borderTop="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
//         <Button w="full" variant="ghost" colorScheme="red" fontSize="sm">
//           Logout
//         </Button>
//       </Box>
//     </VStack>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <IconButton
//         display={{ base: "flex", md: "none" }}
//         onClick={onOpen}
//         variant="outline"
//         aria-label="Open menu"
//         position="fixed"
//         top="4"
//         left="4"
//         zIndex="10"
//       >
//         ☰
//       </IconButton>

//       {/* Desktop Sidebar */}
//       <Box
//         display={{ base: "none", md: "block" }}
//         w="64"
//         h="100vh"
//         bg="white"
//         _dark={{ bg: "gray.800" }}
//         boxShadow="sm"
//         overflowY="auto"
//         position="fixed"
//         left="0"
//         top="0"
//       >
//         {SidebarContent}
//       </Box>

//       {/* Mobile Drawer */}
//       <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//         <DrawerOverlay />
//         <DrawerContent bg="white" _dark={{ bg: "gray.800" }}>
//           <DrawerCloseButton />
//           <DrawerBody p="0">
//             {SidebarContent}
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };
