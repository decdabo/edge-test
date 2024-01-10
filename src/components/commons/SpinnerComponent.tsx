import { Flex, Spin } from 'antd'
import React from 'react'

export const SpinnerComponent = ({ height = '75vh' }: { height?: string }) => {
  return (
    <Flex align="center" justify="center" style={{ height }}>
      <Spin />
    </Flex>
  )
}
