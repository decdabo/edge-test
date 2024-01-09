'use client'
import { StreamDetailComponent } from '@/components/commons/StreamDetailComponent'
import { getStreamById } from '@/services/services'
import { PAGES } from '@/utils/pages'
import { StreamStatus } from '@/utils/types'
import { Col, Descriptions, Divider, Row, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const Page = () => {
  const router = useRouter()
  const stream_id = useSearchParams().get('id')
  const [ streamData, setStreamData ] = useState<StreamStatus>()

  useEffect(() => {
    if (stream_id) {
      getStreamById(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0NzI2NzkzLCJleHAiOjE3MDczMTg3OTN9.08cdBikBQG1wDhXrbvMpAHRwC-xE9rS4j6jolwA0Xtk",
        stream_id
      ) 
      .then(response => setStreamData(response))
    } else {
      router.push(PAGES.HOME)
    }
  }, [stream_id])

  

  return (
    <div className='bg-grey' style={{ height: '100%', padding: '20px' }}>
      {
        streamData && (
          <StreamDetailComponent streamData={streamData} isStream={true} />
        )
      }
    </div>
  )
}

export default Page;
