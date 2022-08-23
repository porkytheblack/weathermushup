import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import {FiPlus, FiMoreVertical} from "react-icons/fi"
import { FlexRowCenterCenter } from '../../utils/FlexConfigs'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper';


function PlayerActions() {

    const {openModal} = useContext(SpotifyWrapperContext)
    
  return (
    <Flex
        {
            ...FlexRowCenterCenter
        }
        w="80%"
        p="10px"
        rounded="full"
        bg="transparent"
        backdropBlur={"12px"}
        backdropFilter="auto"
    >
        <Tooltip label={"Like"} >
            <IconButton aria-label='toggle like' >
                <Icon as={FcLike}     />
            </IconButton>
        </Tooltip>
        {/* <IconButton ml="10px" mr="10px" aria-label="add to playlist" >
            <Icon as={FiPlus} />
        </IconButton> */}
        <Tooltip label="More details" >
            <IconButton onClick={openModal} aria-label="more" ml="10px" mr="10px" >
                <Icon as={FiMoreVertical} />
            </IconButton>
        </Tooltip>
       

        <Menu  > 
            <MenuButton as={Button} aria-label="more"
            //  rightIcon={<Icon as={FiMoreVertical} color="black"  />}  
             >
                <Text color="black" >
                    Add to playlist
                </Text>
            </MenuButton>
            <MenuList>
                <MenuItem>
                    Cool playlist
                </MenuItem>
                <MenuItem>
                    Another playlist
                </MenuItem>
            </MenuList>
        </Menu>
    </Flex>
  )
}

export default PlayerActions