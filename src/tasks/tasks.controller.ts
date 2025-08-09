import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    }

    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    // pada bagian @Body diatas kita akan mendapatkan apa saja yang dikirim oleh client baik itu title, description, status, abcd dsb. mungkin bisa dituliskan seperti ini
    // createTask(@Body('title') title: string, @Body('description') description: string)
    //namun menurutku akan terlalu panjang jika parameter yang kita butuhkan banyak

    // DTO : Data Transfer Objek, adalah sebuah usaha untuk menstandarisasikan apa yang akan kita terima dan kita keluarkan, DTO dibentuk/didefinisikan dengan object dan class (terenkapsulasi di class) agar dapat dibawa terus menerus antar kode. nah data dimasa depan bisa saja berganti tipe datanya atau namanya, nah jika kita lihat, di parameter-parameter yang ada selalu kita tulis satu satu secara manual data-data yang diperlukan dibanyak tempat/script , nah kita bisa menggunakan DTO untuk mengatasi hal itu, agar jika terjadi perubahan bentuk data bisa kita lakukan di file DTO-nya saja.
    // DTO tidak khusus untuk Nest JS tapi berbagai bahasa pemrograman telah menggunakannya untuk keperluan pembawaan data antar kode.
    // dalam konteks typescript dto sangat didukung untuk dipergunakan
    // batasi dto hanya untuk penyimpanan, pengambilan, validasi, serialisasi atau deserialisasi data saja jangan ada fungsi yang lain. karena kita tahu dto dibentuk dengan class jadi kita bisa saja menambahkan fungsi fungsi yang tidak diperlukan
    // bisa digunakan dan sangat berguna untuk validasi data
    // selain class, dto juga bisa dibuat menggunakan interface, tapi rekomendasinya tetap class. karena interface merupakan kode typescript yang akan diubah menjadi kelas di javascript (setelah di transpiler) sedangkan class akan tetap bertahan walaupun sesudah di transpiler,
    // DTO tidak diharuskan untuk dipakai di source code anda, tapi jika anda ingin meningkatkan standarisasi kode Anda untuk keperluan maintenis dan refaktorisasi gunakan DTO
    // konvensi standart penamaan file  ex: create-task.dto.ts

    console.log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  viewTaskById(@Param('id') id: string): Task {
    return this.taskService.viewTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    updateTaskDto.id = id;
    return this.taskService.updateTask(updateTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('taskStatus') taskStatus: TaskStatus): Task {
    return this.taskService.updateTaskStatus(id, taskStatus);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): boolean {
    this.taskService.deleteTask(id);
    return true;
  }
}
