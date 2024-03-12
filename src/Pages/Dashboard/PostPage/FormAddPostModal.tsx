import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Select, Spin, Typography, message } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createPost } from '../../../apis/post.apis'
import { getApartmentList } from '../../../redux/actions/apartment.actions'
import { getApartmentClassList } from '../../../redux/actions/apartmentClass.action'
import { getArea } from '../../../redux/actions/area.actions'
import { getBuildingList } from '../../../redux/actions/building.actions'
import { getPostList, updatePost } from '../../../redux/actions/post.actions'
import { getZoneList } from '../../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { setIsLoading } from '../../../redux/slices/post.slice'
import { createPostFormValues, createPostSchema } from '../../../schema/post.schema'
import { apartment } from '../../../types/appartment.type'
import { building } from '../../../types/building.type'
import { post } from '../../../types/post.type'
import { zone } from '../../../types/zone.type'
import UploadImage from './UploadImage'

const defaultFormValues: createPostFormValues = {
  title: '',
  description: '',
  apartmentId: 1,
  areaId: null,
  buildingId: null,
  zoneId: null
}

type Props = {
  postEdit: post | null
  isOpenModalAdd: boolean
  isOpenModalEdit: boolean
  setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  setEditPost: React.Dispatch<React.SetStateAction<post | null>>
}

const FormAddPostModal = (props: Props) => {
  const { isOpenModalAdd, setIsOpenModalAdd, isOpenModalEdit, postEdit, setIsOpenModalEdit, setEditPost } = props
  const { control, handleSubmit, setValue, formState, getValues, reset } = useForm<createPostFormValues>({
    resolver: yupResolver(createPostSchema),
    defaultValues: defaultFormValues
  })
  const { errors } = formState
  const { apartmentList } = useSelector((state: RootState) => state.apartment)
  const areaList = useSelector((state: RootState) => state.area.areaList)
  const zoneList = useSelector((state: RootState) => state.zone.ZoneList)
  const buildingList = useSelector((state: RootState) => state.building.buildingList)
  const [filteredZoneList, setFilteredZoneList] = useState<zone[]>(zoneList)
  const [filteredBuildingList, setFilteredBuildingList] = useState<building[]>(buildingList)
  const [filteredApartmentList, setFilteredApartmentList] = useState<apartment[]>(apartmentList)
  const { isLoading: isPostLoading } = useSelector((state: RootState) => state.post)
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getArea())
    dispatch(getZoneList())
    dispatch(getBuildingList())
    dispatch(getApartmentClassList())
    const promise = dispatch(getApartmentList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    if (isOpenModalEdit && postEdit) {
      reset({
        apartmentId: postEdit.apartment.id,
        title: postEdit.title,
        description: postEdit.description,
        areaId: postEdit.apartment.building.zone.area.id,
        zoneId: postEdit.apartment.building.zone.id,
        buildingId: postEdit.apartment.building.id
      })
    }
  }, [isOpenModalEdit])

  useEffect(() => {
    // Logic để lọc danh sách Zone dựa trên giá trị của area
    const filteredZones = zoneList.filter((zone) => !getValues('areaId') || zone.area.id === getValues('areaId'))
    setFilteredZoneList(filteredZones)

    // Logic để lọc danh sách Building dựa trên giá trị của area và zone
    const filteredBuildings = buildingList.filter(
      (building) =>
        (!getValues('areaId') || building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || building.zone.id === getValues('zoneId'))
    )
    setFilteredBuildingList(filteredBuildings)

    // Logic để lọc danh sách Apartment dựa trên giá trị của area, zone, và building
    const filteredApartments = apartmentList.filter(
      (apartment) =>
        (!getValues('areaId') || apartment.building.zone.area.id === getValues('areaId')) &&
        (!getValues('zoneId') || apartment.building.zone.id === getValues('zoneId')) &&
        (!getValues('buildingId') || apartment.building.id === getValues('buildingId'))
    )
    setFilteredApartmentList(filteredApartments)
  }, [zoneList, buildingList, apartmentList, getValues])

  useEffect(() => {
    setValue('zoneId', null)
    setValue('buildingId', null)
  }, [setValue, control])

  useEffect(() => {
    setValue('buildingId', null)
  }, [setValue, control])

  const onSubmit: SubmitHandler<createPostFormValues> = async (data) => {
    try {
      if (isOpenModalAdd) {
        dispatch(setIsLoading(true))
        const { apartmentId, title, description } = data
        if (!apartmentId) {
          message.error('Please Apartment')
          return
        }
        await createPost({ apartmentId, description, title })
        message.success('Create Post Successfully!')
        setIsOpenModalAdd(false)
        dispatch(getPostList())
      }
      if (isOpenModalEdit && !isEmpty(postEdit)) {
        const { title, description } = data
        dispatch(updatePost({ id: postEdit?.id, body: { title, description } }))
        message.success('Update Post Successfully!')
        setIsOpenModalEdit(false)
      }
      reset(defaultFormValues)
      setEditPost(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const onError: SubmitErrorHandler<createPostFormValues> = (errors: FieldErrors<createPostFormValues>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && messageApi.error(errorMessage)
    })
  }

  const handleCancel = () => {
    if (isOpenModalAdd) {
      setIsOpenModalAdd(false)
    } else {
      setIsOpenModalEdit(false)
    }
    reset(defaultFormValues)
    setEditPost(null)
  }

  return (
    <Modal
      title={isOpenModalEdit ? 'Edit Post' : 'Add new post'}
      open={isOpenModalAdd || isOpenModalEdit}
      okText={isOpenModalEdit ? 'Update Post' : 'Add New Post'}
      onOk={handleSubmit(onSubmit, onError)}
      onCancel={handleCancel}
    >
      <Spin spinning={isPostLoading}>
        {contextHolder}
        <Typography.Title level={5}>Title</Typography.Title>
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <Input
              status={errors.title && 'error'}
              placeholder='Input Title'
              value={field.value}
              onChange={(e) => setValue('title', e.target.value)}
            />
          )}
        />
        <Typography.Title level={5}>Description</Typography.Title>
        <Controller
          control={control}
          name='description'
          render={({ field }) => (
            <Input
              status={errors.description && 'error'}
              placeholder='Input Description'
              value={field.value}
              onChange={(e) => setValue('description', e.target.value)}
            />
          )}
        />
        <Typography.Title level={5}>Apartment</Typography.Title>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ width: '50%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Area</Typography.Paragraph>
            <Controller
              control={control}
              name='areaId'
              defaultValue={null}
              render={({ field }) => (
                <Select
                  disabled={isOpenModalEdit}
                  value={field.value}
                  style={{ width: '90%' }}
                  onChange={(value) => {
                    setValue('areaId', value)
                    setValue('zoneId', null)
                    setValue('buildingId', null)
                    setValue('apartmentId', null)
                  }}
                  options={areaList.map((area) => ({ value: area.id, label: area.name }))}
                />
              )}
            />
          </div>
          <div style={{ width: '50%' }}>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Zone</Typography.Paragraph>
            <Controller
              control={control}
              name='zoneId'
              defaultValue={null}
              render={({ field }) => (
                <Select
                  disabled={isOpenModalEdit}
                  value={field.value}
                  style={{ width: '90%' }}
                  onChange={(value) => {
                    setValue('zoneId', value)
                    setValue('buildingId', null)
                  }}
                  options={filteredZoneList.map((zone) => ({
                    value: zone.id,
                    label: zone.name
                  }))}
                />
              )}
            />
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <Typography.Paragraph style={{ fontWeight: 'bold' }}>Building</Typography.Paragraph>
          <Controller
            control={control}
            name='buildingId'
            defaultValue={null}
            render={({ field }) => (
              <Select
                disabled={isOpenModalEdit}
                value={field.value}
                style={{ width: '100%' }}
                onChange={(value) => setValue('buildingId', value)}
                options={filteredBuildingList.map((building) => ({ value: building.id, label: building.name }))}
              />
            )}
          />
        </div>
        <div style={{ padding: 10 }}>
          <Typography.Paragraph style={{ fontWeight: 'bold' }}>Apartment</Typography.Paragraph>
          <Controller
            control={control}
            name='apartmentId'
            render={({ field }) => (
              <Select
                disabled={isOpenModalEdit}
                status={errors.apartmentId && 'error'}
                value={field.value}
                style={{ width: '100%' }}
                onChange={(value) => setValue('apartmentId', value)}
                options={filteredApartmentList.map((apartment) => ({ value: apartment.id, label: apartment.name }))}
              />
            )}
          />
        </div>

        {postEdit !== null && (
          <div>
            <UploadImage post={postEdit} />
          </div>
        )}
      </Spin>
    </Modal>
  )
}

export default FormAddPostModal
