1. import AutoLoad from '@fastify/autoload'

👉 Giải thích:

Đây là cách import (ESM syntax) để nạp module @fastify/autoload.

@fastify/autoload là một plugin đặc biệt của Fastify giúp tự động load (nạp) toàn bộ các plugin hoặc route từ thư mục chỉ định mà không cần phải import từng cái thủ công.
2. import { join } from 'path'

👉 Giải thích:

path là module gốc (core module) của Node.js dùng để xử lý đường dẫn file/thư mục.

join() giúp kết hợp các phần của đường dẫn lại thành một chuỗi chuẩn, phù hợp với hệ điều hành.
3. import { fileURLToPath } from 'url'
Giúp bạn xác định được vị trí file hiện tại khi dùng cú pháp import (ESM).

Sau đó dùng join(__dirname, 'plugins') để chỉ đúng đường dẫn đến thư mục cần autoload.