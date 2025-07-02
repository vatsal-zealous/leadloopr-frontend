import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "./utils/axios";
import { useNavigate } from "react-router-dom";

// Schema
const schema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
});

function FormPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/user-data", data);
      navigate("/");
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        User Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            {...register("full_name")}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />
          <TextField
            label="Company"
            {...register("company")}
            error={!!errors.company}
            helperText={errors.company?.message}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default FormPage;
