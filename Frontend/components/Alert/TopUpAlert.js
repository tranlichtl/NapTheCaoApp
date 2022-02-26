import React, { useCallback } from "react"
import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Box,
  Text,
  Collapse
} from "native-base"

const TopUpAlert = (showAlert, setShowAlert) => {

    const handleShow = useCallback(() => {
        this.setShowAlert(false)
    }, [showAlert])
    
    return (
    <Box w="100%">
        <Collapse isOpen={showAlert}>
        <Alert w="100%" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Vui lòng nhập đúng thông tin!
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={handleShow()}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: "coolGray.600",
                },
              }}
            >
              Độ dài số seri hoặc số thẻ bạn vừa nhập không hợp lệ.
            </Box>
          </VStack>
        </Alert>
        </Collapse>
    </Box>
    )
}

export default TopUpAlert